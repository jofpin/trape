FROM ubuntu:16.04
MAINTAINER Furkan SAYIM <furkan.sayim@yandex.com>

RUN apt-get update \
    && apt-get install git -y \
    && apt-get install python -y \
    && apt-get install python-pip -y
RUN git clone https://github.com/jofpin/trape.git /tmp/trape

WORKDIR /tmp/trape

RUN pip install -r requirements.txt

ENTRYPOINT ["python", "trape.py"]
