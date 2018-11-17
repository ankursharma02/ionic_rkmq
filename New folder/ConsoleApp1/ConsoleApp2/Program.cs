using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using org.apache.rocketmq.client.consumer;

using org.apache.rocketmq.client.consumer.listener;
using org.apache.rocketmq.remoting.common;
using org.apache.rocketmq.common.message;


namespace ConsoleApp2
{
    class Program
    {
        static void Main(string[] args)
        {
            DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("test");
            // consumer.setConsumeFromWhere(consumeFromWhere.CONSUME_FROM_FIRST_OFFSET);


            consumer.setNamesrvAddr("localhost:9876");
            consumer.subscribe("topic", "*");

            consumer.registerMessageListener(new TestListener());
            consumer.start();
        }
    }
}
