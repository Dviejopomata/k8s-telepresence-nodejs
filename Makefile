current_dir = $(shell pwd)

curr_dir:
	echo ${current_dir}

swap:
	telepresence --swap-deployment dvp --docker-run --rm -it -v $(current_dir):/service node-dev1:latest

deploy_python:
	telepresence --new-deployment hello-world --expose 8100

deploy:
	kubectl create -f deployment.yaml -f service.yaml

undeploy:
	kubectl delete -f deployment.yaml -f service.yaml

build:
	docker build -t node-dev1 .

run:
	docker run -v $(current_dir):/service -d -p 0.0.0.0:3001:3001 -p 3000:3000 --name node1 node-dev1
	echo "successfully run"

exec:
	docker exec -it node1 bash

remove:
	docker rm node1 -f
	
push:
	docker tag node-dev1 registry.nextagilesoftdev.com/dviejo/gt-new/node-dev1
	docker push registry.nextagilesoftdev.com/dviejo/gt-new/node-dev1

get_urls:
	sudo minikube service --url dvp