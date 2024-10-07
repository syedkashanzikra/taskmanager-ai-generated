using System.Diagnostics;
using Newtonsoft.Json;  // Make sure to include this

namespace TaskManager.Server.Services
{
    public class SentimentAnalysisService
    {
        public string AnalyzeSentiment(string text)
        {
            var psi = new ProcessStartInfo();
            psi.FileName = "python";  // Assumes python is installed and in the system PATH
            psi.Arguments = $"Scripts/sentiment_analysis.py \"{text}\"";
            psi.RedirectStandardOutput = true;
            psi.UseShellExecute = false;
            psi.CreateNoWindow = true;

            var process = Process.Start(psi);
            var result = process.StandardOutput.ReadToEnd();
            process.WaitForExit();

            // Deserialize the JSON result
            dynamic sentimentResult = JsonConvert.DeserializeObject(result);
            return sentimentResult.sentiment;
        }
    }
}
