# A virtual environment in Python is a way to create an isolated workspace for your project. Instead of installing packages globally (which can cause conflicts), each project gets its own separate environment with its own dependencies.

# It only isolates the python packages not the entire system... like Docker.

## python -m venv myenv

## myenv\Scripts\activate


## pip install numpy pandas flask
* These will be installed only inside this environment, not globally.

## deactivate
* TO deactivate environment.