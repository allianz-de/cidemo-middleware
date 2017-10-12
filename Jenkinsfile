#!/usr/bin/env groovy
@Library('demo-pipeline-library') _

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    parameters {
        string( name: 'CF_URL',
                defaultValue: 'https://api.system.dadpo.azd.cloud.allianz',
                description: 'Cloud Foundry URL')
    }

    tools {
        nodejs 'node-8'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('NPM Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Compile') {
            steps {
                sh 'npm run compile'
            }
        }

        stage('Deploy') {
            when { branch "master" }
            steps {
                cf (pcfApiUrl: params.CF_URL, credentialsId: 'pcf', space: 'dev') {
                    sh "cf push"
                }
            }
            post {
                failure {
                    hipchatSend room: 'CIDEMO - Notifications',
                                color: "RED",
                                message: "Deployment FAILED: ${env.JOB_NAME} ${env.BUILD_NUMBER}"
                }
            }
        }
    }
}
