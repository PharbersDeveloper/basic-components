FROM ubuntu:18.04

RUN apt-get update && apt-get install -y && \
	apt-get upgrade -y && \
	apt-get install git -y && \
	apt-get install curl wget -y && apt-get install -y && \
	apt-get install gnupg -y && \
	apt-get clean

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
	apt-get install -y nodejs

ENV EMBERVERSION 3.4.4
ENV	BOWERVERSION 1.8.4

RUN npm update && \
	npm install -g ember-cli@${EMBERVERSION} && \
	npm install -g bower@${BOWERVERSION}

WORKDIR /app

LABEL official.version=0.0.1

RUN git clone https://github.com/PharbersDeveloper/PharbersWeb.git Basic-Components &&\
	git clone https://github.com/PharbersDeveloper/PharbersWeb.git 

WORKDIR /app/Basic-Components

RUN git checkout -b basic-components origin/basic-components && \
	npm install && \
	npm link

WORKDIR /app/PharbersWeb

RUN git checkout -b official-0113 origin/official-0113 && \
	rm -rf node_modules && \
	rm package-lock.json && \
	npm cache clear --force && \
	npm install && \
	bower install foundation --allow-root && \
	bower install ali-oss --allow-root	&& \
	npm link basic-components

RUN ember b --environment production

EXPOSE 8082

ENTRYPOINT ["ember", "s", "--live-reload=false"]
