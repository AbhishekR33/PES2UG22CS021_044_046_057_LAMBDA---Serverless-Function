import subprocess
import uuid
import os
import shutil

def package(function_name):
    # Create a temporary directory for the function
    temp_dir = os.path.abspath(f"/tmp/{function_name}")
    os.makedirs(temp_dir, exist_ok=True)
    
    # Copy the function file and rename it to function.py
    source_file = os.path.abspath(f"serverless-platform/functions/python/{function_name}.py")
    destination_file = os.path.join(temp_dir, "function.py")
    
    if not os.path.exists(source_file):
        raise FileNotFoundError(f"Function file {source_file} does not exist.")
    
    shutil.copy(source_file, destination_file)
    return temp_dir

def execute_function(function_name, timeout=5):
    container_name = f"{function_name}-{uuid.uuid4().hex[:8]}"
    image = "serverless-python"
    function_path = package(function_name)

    try:
        # Run the Docker container
        result = subprocess.run(
            [
                "docker", "run", "--rm", "--name", container_name,
                "-v", f"{function_path}:/app", image
            ],
            capture_output=True, text=True, timeout=timeout
        )
        return {"stdout": result.stdout, "stderr": result.stderr}
    except subprocess.TimeoutExpired:
        return {"error": f"Function {function_name} timed out after {timeout} seconds"}
    except Exception as e:
        return {"error": str(e)}
    finally:
        # Clean up the temporary directory
        if os.path.exists(function_path):
            shutil.rmtree(function_path)

# Example usage
if __name__ == "__main__":
    print(execute_function("hellopy"))