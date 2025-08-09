# File: lucidian_brain/llama3_runner.py

import subprocess

def generate_with_llama3(prompt: str) -> str:
    process = subprocess.Popen(
        ["ollama", "run", "llama3"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )

    # Send the prompt
    stdout, stderr = process.communicate(input=prompt)

    if process.returncode != 0:
        print("⚠️ Error from LLaMA3:", stderr)
        return "Sorry, something went wrong in my mind."

    return stdout.strip()
