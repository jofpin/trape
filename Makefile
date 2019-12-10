build:
	@docker build -t x0rzkov/trape:alpine-py27 .

run:
	@docker run -ti --rm x0rzkov/trape:alpine-py27
