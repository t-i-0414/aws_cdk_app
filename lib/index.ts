import { Construct } from "constructs";
import { Runtime, Function, AssetCode } from "aws-cdk-lib/aws-lambda";
import { StackProps } from "aws-cdk-lib";
import {
  Dashboard,
  TextWidget,
  GraphWidget,
  LogQueryWidget,
} from "aws-cdk-lib/aws-cloudwatch";

export class cloudwatchDashboardStack extends Construct {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id);

    //Create Lambda Function
    const lambdaFunction = new Function(this, "cloudwatchDashboardStack", {
      code: new AssetCode("resources"),
      handler: "lambda-handler.handler",
      runtime: Runtime.PYTHON_3_9,
      functionName: "cloudwatch-Dashboard",
    });

    //Create CloudWatch Dashboard
    const dashboard = new Dashboard(this, "dashboard", {
      dashboardName: "LambdaDashboard",
    });

    //Create Title with Text Widget
    dashboard.addWidgets(
      new TextWidget({
        markdown: "# Lambda CloudWatch Dashboard",
        height: 2,
        width: 20,
      })
    );

    //Create Metrics Graph with Graph Widget
    dashboard.addWidgets(
      new GraphWidget({
        title: "Invocations",
        left: [lambdaFunction.metricInvocations()],
        width: 20,
      })
    );

    dashboard.addWidgets(
      new GraphWidget({
        title: "Errors",
        right: [lambdaFunction.metricErrors()],
        width: 20,
      })
    );

    //Create Widget to show Log Entries
    dashboard.addWidgets(
      new LogQueryWidget({
        logGroupNames: [lambdaFunction.logGroup.logGroupName],
        queryLines: ["fields @timestamp, @message", "limit 10"],
        width: 20,
      })
    );
  }
}
