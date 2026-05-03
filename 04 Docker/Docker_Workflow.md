# **Docker Workflow**

##### 

1. ##### **Write a simple Python program**
2. ##### **Create a Dockerfile (instructions for building an image)**
3. ##### **Build a Docker Image (like a blueprint/snapshot)**
4. ##### **Run a Container (a running instance of that image)**
5. ##### **Push the image to Docker Hub (cloud storage for images)**









#### **Step-01**

##### Created a simple Python script. created a sample python file in some folder and wrote one print statement inside that python file





#### **Step-02**

##### Created a file named **Dockerfile** and added 4 instructions





###### **FROM python:3.10**

###### 

###### **WORKDIR /app**

###### 

###### **COPY . .**

###### 

###### **CMD \["python", "app.py"]**









#### **Step-03**

##### Build Docker image using below command: 



##### C:\\Users\\Yethishwar Tachyon\\Desktop\\Git Repositoy\\AI-engineering\\04 Docker>**docker build -t my-python-app .**

\[+] Building 536.2s (10/10) **FINISHED**                                                                 docker:desktop-linux

&#x20;=> \[internal] load build definition from Dockerfile                                                                 0.1s

&#x20;=> => transferring dockerfile: 268B                                                                                 0.0s

&#x20;=> \[internal] load metadata for docker.io/library/python:3.10                                                       3.7s

&#x20;=> \[auth] library/python:pull token for registry-1.docker.io                                                        0.0s

&#x20;=> \[internal] load .dockerignore                                                                                    0.1s

&#x20;=> => transferring context: 2B                                                                                      0.0s

&#x20;=> \[1/3] FROM docker.io/library/python:3.10@sha256:1dfc716d668e86a3b75295306596baf27f5bb923069c9718295c7eca0979a  530.4s

&#x20;=> => resolve docker.io/library/python:3.10@sha256:1dfc716d668e86a3b75295306596baf27f5bb923069c9718295c7eca0979af2  0.0s

&#x20;=> => sha256:a77d8544e754133a18dc4b38633bffd75a9bc673a933660f735e40688dcfd5e2 21.15MB / 21.15MB                    75.2s

&#x20;=> => sha256:1820441a74ebdfee2423d53f15cc0c720799dbb6793f16369a2f6e9c425ad266 249B / 249B                           1.2s

&#x20;=> => sha256:4bc86f96f20e27033056feaa2b317d2b85e4ce16f30cb27253570b7c6371e7ee 6.08MB / 6.08MB                      37.9s

&#x20;=> => sha256:1e1bb20756a85e159dfb7908a2a5c860ac2f2254254a915d8c047e02cb2b0259 236.07MB / 236.07MB                 515.5s

&#x20;=> => sha256:20d12c8f3f3fbb5bd2b8369adf3213e09d6b33f975462543ddfece85b2fe85e5 67.79MB / 67.79MB                   478.3s

&#x20;=> => sha256:5467f93954cfe1451f4333422086d00bd066cf33f42112b531804ffe06f0a929 25.62MB / 25.62MB                    99.3s

&#x20;=> => sha256:3b32e3bb7338c216b077e95920ae53332d81bd57f4a7393bc324432d5a3f88a2 49.30MB / 49.30MB                   413.3s

&#x20;=> => extracting sha256:3b32e3bb7338c216b077e95920ae53332d81bd57f4a7393bc324432d5a3f88a2                            3.5s

&#x20;=> => extracting sha256:5467f93954cfe1451f4333422086d00bd066cf33f42112b531804ffe06f0a929                            1.4s

&#x20;=> => extracting sha256:20d12c8f3f3fbb5bd2b8369adf3213e09d6b33f975462543ddfece85b2fe85e5                            5.6s

&#x20;=> => extracting sha256:1e1bb20756a85e159dfb7908a2a5c860ac2f2254254a915d8c047e02cb2b0259                           12.6s

&#x20;=> => extracting sha256:4bc86f96f20e27033056feaa2b317d2b85e4ce16f30cb27253570b7c6371e7ee                            0.4s

&#x20;=> => extracting sha256:a77d8544e754133a18dc4b38633bffd75a9bc673a933660f735e40688dcfd5e2                            1.6s

&#x20;=> => extracting sha256:1820441a74ebdfee2423d53f15cc0c720799dbb6793f16369a2f6e9c425ad266                            0.1s

&#x20;=> \[internal] load build context                                                                                    0.1s

&#x20;=> => transferring context: 359B                                                                                    0.0s

&#x20;=> \[auth] library/python:pull token for registry-1.docker.io                                                        0.0s

&#x20;=> \[2/3] WORKDIR /app                                                                                               0.6s

&#x20;=> \[3/3] COPY . .                                                                                                   0.1s

&#x20;=> exporting to image                                                                                               0.8s

&#x20;=> => exporting layers                                                                                              0.2s

&#x20;=> => exporting manifest sha256:a664baf51d048a16670079877b0e922b6d7b02e4138cbdad369d1582ac0afbb8                    0.0s

&#x20;=> => exporting config sha256:3bebc7ba8dd2453fa0e7dea3f9898e647118ed4225f2a8ab17ce27d65f7bff5b                      0.0s

&#x20;=> => exporting attestation manifest sha256:1ad99aaf7e546401697bcefcd5f2a30fff92e496b1b874098293b62dcd25e80f        0.1s

&#x20;=> => exporting manifest list sha256:3c4aa9f398425045ef9c42d27b1867139e0d45cd294b653b125654e4709939bd               0.0s

&#x20;=> => naming to docker.io/library/my-python-app:latest                                                              0.0s

&#x20;=> => unpacking to docker.io/library/my-python-app:latest                                                           0.2s







#### **Step-04**

##### Running the container: creating a container from the image.

###### C:\\Users\\Yethishwar Tachyon\\Desktop\\Git Repositoy\\AI-engineering\\04 Docker>**docker run my-python-app**

**Hello THis is yethishwar... from docker file**











#### **Step-05**

##### Created DockerHub account and credentials are configured here... by using below command

###### C:\\Users\\Yethishwar Tachyon\\Desktop\\Git Repositoy\\AI-engineering\\04 Docker>**docker login**

**Authenticating with existing credentials... \[Username: yethishwarm]**



i Info → To login with a different account, run 'docker logout' followed by 'docker login'



**Login Succeeded**







#### **Step-06**

##### Tagging the image for DockerHub

###### C:\\Users\\Yethishwar Tachyon\\Desktop\\Git Repositoy\\AI-engineering\\04 Docker>**docker tag my-python-app yethishwarm/my-python-app**  







#### **Step-07**

##### Push work to the Docker Hub

###### C:\\Users\\Yethishwar Tachyon\\Desktop\\Git Repositoy\\AI-engineering\\04 Docker>**docker push yethishwarm/my-python-app**

Using default tag: latest

**The push refers to repository \[docker.io/yethishwarm/my-python-app]**

**21f83d80627c: Layer already exists** 

**1e1bb20756a8: Pushed** 

**a77d8544e754: Layer already exists** 

**1820441a74eb: Layer already exists** 

**5467f93954cf: Pushed** 

**20d12c8f3f3f: Pushed** 

**0875dee8301d: Layer already exists** 

**cdaa28790494: Already exists** 

**4bc86f96f20e: Pushed** 

**3b32e3bb7338: Pushed** 

**latest: digest: sha256:5af8ba8f9b6d57ce499c26c650847f2d8775915e057fa5cbed288d6c27d0d301 size: 856**









#### **Step-08**

##### Verify the image pushed to the DockerHub.









Some other usefull commands used in docker....

docker build     # create image

docker run       # run container

docker ps        # check containers

docker images    # check images

docker stop      # stop container

docker rm        # delete container

docker rmi       # delete image

docker push      # upload image

docker pull      # download image



