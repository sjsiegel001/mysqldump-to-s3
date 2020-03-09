handler () {
    set -e

    TIMEE=$(date +%Y-%m-%d-%H%M%S)

    echo "Backing up ${EXPORT_DB_NAME} to ${EXPORT_S3_PATH}/${EXPORT_DB_NAME}.sql"
    ./mysqldump --host ${EXPORT_DB_HOST} --opt -u ${EXPORT_DB_USERNAME} -p${EXPORT_DB_PASSWORD} ${EXPORT_DB_NAME} | gzip | aws s3 cp - s3://${EXPORT_S3_PATH}/${EXPORT_DB_NAME}-$TIMEE.sql.gz
}
