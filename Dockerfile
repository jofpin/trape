FROM python:2-alpine

RUN apk --update add --virtual build-dependencies python-dev build-base wget git

RUN git clone https://github.com/boxug/trape.git
WORKDIR /trape

RUN  pip install -r requirements.txt && pip install eventlet
EXPOSE 80
ENTRYPOINT ["python","trape.py"]
CMD ["--url", "https://google.com","--port","80"]
