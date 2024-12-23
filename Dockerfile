# define the baseImage
FROM oven/bun:1

# define the base working directory
WORKDIR /app

COPY package.json /app
COPY bun.lockb /app

RUN bun install

# copy the rest of the files
COPY . /app

# expose the containers port to the host
EXPOSE 3000

CMD ["bun", "run","dev"]
