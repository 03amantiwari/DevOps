//flow 
//github push -> checkout -> Test ->Build jar -> Docker Build ->Docker push ->

pipeline {

    agent any

    environment {
        DOCKERHUB_USERNAME = "0303amantiwari"

        BACKEND_IMAGE = "${DOCKERHUB_USERNAME}/easyseat-backend"
        FRONTEND_IMAGE = "${DOCKERHUB_USERNAME}/easyseat-frontend"
        IMAGE_TAG = "v${BUILD_NUMBER}"

        CONTEXT_PATH = "/api/v1"
    }

    stage{
        //STAGE 1 - Checkout

        stage('Checkout'){
            steps {
                echo "======== Stage 1: Checkout latest code ========"
                checkout scm
            }
        }

        //STAGE 3 -> TEST

        // stage('Test') {
        //     steps {
        //         echo "======== Stage 2: Running Maven tests ========"
        //         dir('Backend') {
        //             sh 'mvn test -B'
        //         }
        //     }
        //     post {
        //         success {
        //             echo "✅ All tests passed"
        //         }
        //         failure {
        //             echo "❌ Tests failed — pipeline stopped. Fix tests first."
        //         }
        //     }
        // }
        
        //STAGE 3 -> Build jar

        stage('Build JAR') {
            steps {
                echo "======== Stage 3: Building JAR ========"
                dir('Backend') {
                    sh 'mvn package -DskipTests -B'
                }
                // Verify JAR was created
                sh 'ls -lh Backend/target/*.jar'
            }
        }

        //STAGE 4 -> Docker Build

        stage('Docker Build') {
            steps {
                echo "======== Stage 4: Building Docker images ========"
 
                // ---- Backend ----
                sh """
                    docker build \
                        -t ${BACKEND_IMAGE}:${IMAGE_TAG} \
                        -t ${BACKEND_IMAGE}:latest \
                        ./Server
                """

                sh "docker images | grep easyseat-backend"

                // ---- Frontend ----
                sh """
                    docker build \
                        --build-arg VITE_API_URL=BACKEND_URL_PLACEHOLDER \
                        -t ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                        -t ${FRONTEND_IMAGE}:latest \
                        ./frontend
                """
 
                sh "docker images | grep easyseat-frontend"
            }

        }

        //STAGE 5 -> Docker push

        stage('Docker Push') {
            steps {
                echo "======== Stage 5: Pushing images to DockerHub ========"
 
                withCredentials([
                    usernamePassword(
                        credentialsId: 'DockerHubCred',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]){
                    sh '''
                        # Login to DockerHub
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        echo "✅ DockerHub login successful"
 
                        # Push backend — both tags
                        docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
                        docker push ${BACKEND_IMAGE}:latest
                        echo "✅ Backend image pushed: ${BACKEND_IMAGE}:${IMAGE_TAG}"
 
                        # Push frontend — both tags
                        docker push ${FRONTEND_IMAGE}:${IMAGE_TAG}
                        docker push ${FRONTEND_IMAGE}:latest
                        echo "✅ Frontend image pushed: ${FRONTEND_IMAGE}:${IMAGE_TAG}"
 
                        # Always logout
                        docker logout
                        echo "✅ Logged out from DockerHub"
                    '''
                }
            }
        }

        // ----------------------------------------------------------------
        //  STAGE 6 — Deploy to EC2  [DISABLED — EC2 not ready yet]
        //
        //  This stage will be uncommented when EC2 is set up.
        //  It will SSH into EC2, docker pull, and docker compose up.
        // ----------------------------------------------------------------
        // stage('Deploy to EC2') {
        //     steps {
        //         echo "Deploy stage — coming soon after EC2 setup"
        //     }
        // }

        //post pipeline actions

        post {
            success {
                 echo """
            ================================================
            ✅ PIPELINE SUCCESSFUL — Build #${BUILD_NUMBER}
 
            Images on DockerHub:
            → ${BACKEND_IMAGE}:${IMAGE_TAG}
            → ${FRONTEND_IMAGE}:${IMAGE_TAG}
 
            Next: Set up EC2 and enable Deploy stage.
            ================================================
            """
            }

            failure {
                echo """
            ================================================
            ❌ PIPELINE FAILED
            Check console output above for which stage failed.
            ================================================
            """
            }

            always {
            // ---- Cleanup dangling images on Jenkins machine ----
            // Every build creates new images. Old untagged ones waste disk.
            // 'prune -f' removes only dangling (untagged) images — safe.
            sh 'docker image prune -f'
            echo "🧹 Cleaned up dangling Docker images"
            }
        }

    }
}