FROM ubuntu:latest
MAINTAINER Furkan SAYIM <furkan.sayim@yandex.com>

RUN apt-get update \
    && apt-get install git -y \
    && apt-get install python -y \
    && apt-get install python-pip -y \
    && git clone https://github.com/jofpin/trape.git

RUN pip install -r trape/requirements.txt

CMD python trape.py

WORKDIR /trape
