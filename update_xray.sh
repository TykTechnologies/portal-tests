echo "Sending update of test execution to Xray"
EXECUTION=QA-895
if [ "$STATUS" == "success" ]; then
    RESULT="PASSED"
else
    RESULT="FAILED"
fi
# if [ "${ github.ref }" == "success" ]; then
#     STATUS="PASSED"
# else
#     STATUS="FAILED"
# fi
echo "Branch variable:"
echo "$BRANCH"
echo "CLI:"
echo "$5"
echo "Requesting Token"
TOKEN=$(curl -H "Content-Type: application/json" -X POST --data "{ \"client_id\": \"$CLIENT_ID\",\"client_secret\": \"$CLIENT_SECRET\" }" https://xray.cloud.getxray.app/api/v2/authenticate| tr -d '"')
echo "Sending update $RESULT on $TEST and execution $EXECUTION"
curl -H "Authorization: Bearer $TOKEN" -X POST https://xray.cloud.getxray.app/api/v2/import/execution \
    -d '{"testExecutionKey":"'$EXECUTION'","tests":[{"testKey":"'$TEST'","status":"'$RESULT'"}]}' \
    -H 'Content-Type: application/json'