# IngSoftBack

## Requirements
- node >= 16
	- check if ``npm`` works
- Install yarn globally
	- ``npm i -g yarn`` (use ``sudo`` in unix)
## Getting started

### Installation
In this folder...
````
yarn install
````

### Local run
```
yarn dev
```
### There is no need for preview


## Repo healthiness 
### Push
- Always check the branch
- Beware that they might have been other pushes in all branches, so do not forget to ``pull`` first
	- If you have conflicts solve them locally before trying to push again 

### Commits
- Detail concrete information about the changes (even if it is a test)
- Remember to create a pull request every time you push
- When everything is tested make a pull request to ``master `` or ``dev ``


### Branches

#### DONT'S
- Don't use the branches ``master `` or ``dev `` directly on your local machine
- Don't use a branch that has fulfilled the duty it was created for

### Naming
#### Example 1
- We are a bookstore and have a new filter which is a query in  ``Users``
	- The branch should be named `` feat/users-query``

#### Example 2
- We are a bookstore and have a problem on a filter query in  ``Users``
	- The branch should be named `` fix/users-query``
