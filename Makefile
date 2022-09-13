start-dependecies:
	$(info Make: Starting Tyk dashboard and dependecies)
	docker-compose --env-file .env -f ci/tyk_dashboard.yml up &
	sleep 5 
	docker-compose -f selenium-grid.yml up
build-framework:
	$(info Make: Build Framework docker image)
	docker-compose -f docker-compose-test.yml build
execute-prerequisits:
	$(info Make: Executing prerequisits)
	docker-compose -f docker-compose-prerequisits.yml up
execute-tests:
	$(info Make: Executing tests)
	rm -fr results
	docker-compose -f docker-compose-test.yml up
stop-dependecies:
	$(info Make: Starting Tyk dashboard and dependecies)
	docker-compose --env-file .env -f ci/tyk_dashboard.yml down --remove-orphans &
	docker-compose -f selenium-grid.yml down --remove-orphans &