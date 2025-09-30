pipeline {
  agent any

  environment {
    REPO_NAME = 'my-nextjs-app'     // change to your repo name
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare') {
      steps {
        script {
          // short git commit for image tag
          env.IMAGE_TAG = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
          echo "Image tag: ${env.IMAGE_TAG}"
        }
      }
    }

    stage('Install & Build') {
      steps {
        // if your Jenkins node doesn't have Node, wrap with docker.image('node:18').inside { ... }
        sh 'npm ci'
        sh 'npm run build'
      }
    }

    stage('Docker: Build & Push') {
      when {
        expression { return params.PUSH_TO_DOCKER == 'true' }  // optional param to skip docker push
      }
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            set -e
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker build -t $DOCKER_USER/${REPO_NAME}:$IMAGE_TAG .
            docker push $DOCKER_USER/${REPO_NAME}:$IMAGE_TAG
            docker tag $DOCKER_USER/${REPO_NAME}:$IMAGE_TAG $DOCKER_USER/${REPO_NAME}:latest
            docker push $DOCKER_USER/${REPO_NAME}:latest
          '''
        }
      }
    }

    stage('Deploy to Vercel (via Deploy Hook)') {
      steps {
        withCredentials([string(credentialsId: 'vercel-deploy-hook', variable: 'VERCEL_HOOK')]) {
          sh 'curl -s -X POST $VERCEL_HOOK || true'
        }
      }
    }

    // Alternative: use Vercel CLI (if you prefer direct CLI deploy)
    stage('Deploy to Vercel (CLI, optional)') {
      when { expression { return params.USE_VERCEL_CLI == 'true' } }
      steps {
        withCredentials([string(credentialsId: 'vercel-token', variable: 'VERCEL_TOKEN')]) {
          sh '''
            npm i -g vercel
            vercel --prod --token $VERCEL_TOKEN --confirm
          '''
        }
      }
    }
  }

  post {
    success { echo "Pipeline finished successfully." }
    failure { echo "Pipeline failed — check logs." }
  }
}
