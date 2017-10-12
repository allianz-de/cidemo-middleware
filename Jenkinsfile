#!/usr/bin/env groovy
@Library('demo-pipeline-library') _

pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timestamps()
    }

    parameters {
        string( name: 'CF_API',
                defaultValue: 'https://api.local.pcfdev.io',
                description: 'Cloud Foundry API url')

        string( name: 'CF_BASE_HOST',
                defaultValue: 'local.pcfdev.io',
                description: 'Base host for CF apps')

        string( name: 'CF_ORG',
                defaultValue: 'pcfdev-org',
                description: 'Cloud Foundry Org')

        string( name: 'CF_SPACE',
                defaultValue: 'pcfdev-space',
                description: 'Cloud Foundry Space')
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
            when { branch 'master' }
            steps {
                script {
                    String appName = isFeatureBranch()
                                ? appNameFromManifest(append: env.BRANCH_NAME)
                                : appNameFromManifest()
                    cfPush([
                        apiUrl: 'https://api.local.pcfdev.io',
                        org:    'pcfdev-org',
                        space:  'pcfdev-space',
                        credentialsId: 'pcf',
                        skipSSL: true
                    ])
                }
            }
        }
    }
}
