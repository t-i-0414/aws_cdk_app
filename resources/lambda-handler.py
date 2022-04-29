def handler(event, context):
  if (event['status']=='success'):
    return {
      'statusCode': 200,
      'body': "SUCCESS"
    }
  else:
    raise Exception("Error")
