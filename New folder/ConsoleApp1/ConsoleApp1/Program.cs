using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using org.apache.rocketmq.client.producer;
using org.apache.rocketmq.remoting.common;
using org.apache.rocketmq.common.message;
namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args) 
        {
            try
            {
                DefaultMQProducer p = new DefaultMQProducer("test");

                p.setNamesrvAddr("localhost:9876");
                p.start();
                var data = Encoding.UTF8.GetBytes("hello data");
                Message m = new Message("topic", data);
                SendResult sendResult = p.send(m);
                Console.WriteLine("%s%n", sendResult);
                //     p.send(m);
                p.shutdown();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
            }
            Console.ReadLine();
        }
    }
}
