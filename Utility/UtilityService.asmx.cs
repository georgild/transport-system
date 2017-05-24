using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Services;
using System.Xml;
using System.Xml.Serialization;

namespace Utility {
    /// <summary>
    /// Summary description for UtilityService
    /// </summary>
    [WebService(Namespace = "http://localhost/UtilityServices")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class UtilityService : System.Web.Services.WebService {

        [WebMethod]
        public double ConvertCurrency(double amount, string fromCurrency, string toCurrency) {

            double rate = ExecuteSoap(fromCurrency, toCurrency);

            return amount * rate;
        }

        public double ExecuteSoap(string fromCurrency, string toCurrency) {

            HttpWebRequest request = CreateWebRequest(@"http://www.webservicex.net/CurrencyConvertor.asmx");
            XmlDocument soapEnvelopeXml = new XmlDocument();

            string xml = string.Format(@"<?xml version=""1.0"" encoding=""utf-8""?>
                <soap:Envelope xmlns:xsi=""http://www.w3.org/2001/XMLSchema-instance"" xmlns:xsd=""http://www.w3.org/2001/XMLSchema"" xmlns:soap=""http://schemas.xmlsoap.org/soap/envelope/"">
                  <soap:Body>
                        <ConversionRate xmlns=""http://www.webserviceX.NET/"">
                            <FromCurrency>{0}</FromCurrency>
                            <ToCurrency>{1}</ToCurrency>
                        </ConversionRate>
                  </soap:Body>
                </soap:Envelope>", fromCurrency, toCurrency);

            soapEnvelopeXml.LoadXml(xml);

            using (Stream stream = request.GetRequestStream()) {
                soapEnvelopeXml.Save(stream);
            }

            using (WebResponse response = request.GetResponse()) {
                using (StreamReader rd = new StreamReader(response.GetResponseStream())) {
                    string soapResult = rd.ReadToEnd();
                    Console.WriteLine(soapResult);
                    return ParseResponse(soapResult);
                }
            }
        }
        /// <summary>
        /// Create a soap webrequest to [Url]
        /// </summary>
        /// <returns></returns>
        private HttpWebRequest CreateWebRequest(string url) {
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Headers.Add(@"SOAP:Action");
            webRequest.ContentType = "text/xml;charset=\"utf-8\"";
            webRequest.Accept = "text/xml";
            webRequest.Method = "POST";
            return webRequest;
        }

        private double ParseResponse(string soapResponse) {

            XmlDocument xmlDocument = new XmlDocument();
            xmlDocument.LoadXml(soapResponse);

            XmlNode node = xmlDocument.GetElementsByTagName("ConversionRateResult")[0];

            string innerObject = node.InnerText;
            
            return Double.Parse(innerObject);
        }
    }
}
