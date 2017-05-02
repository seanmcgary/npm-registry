## Hosting with Google Cloud functions

```
BUCKET_NAME=npm-registry

gsutil mb "gs://${BUCKET_NAME}-deploy"

gcloud beta functions deploy npm-registry --stage-bucket "${BUCKET_NAME}-deploy" --trigger-http --entry-point=googleCloud

```