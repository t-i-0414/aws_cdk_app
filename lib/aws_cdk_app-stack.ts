import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cw from "../lib/index";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    new cw.cloudwatchDashboardStack(this, "cloudwatch-Dashboard");

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkAppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
