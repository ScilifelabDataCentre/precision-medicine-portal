FROM python:3.9-bullseye
# Set the working directory in the container to /app
WORKDIR /app
# Copy the current directory contents into the container at /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
# Set the FLASK_APP environment variable because it is in the web directory
ENV FLASK_APP web:create_app()

EXPOSE 5000
# Running with flask's built in server
CMD ["flask", "run", "--host=0.0.0.0"]
