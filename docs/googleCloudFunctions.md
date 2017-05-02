## Hosting with Google Cloud functions

```
BUCKET_NAME=<bucket-name>

gsutil mb "gs://${BUCKET_NAME}-deploy"

gcloud beta functions deploy npm-registry --stage-bucket "${BUCKET_NAME}-deploy" --trigger-http --entry-point=googleCloud

```