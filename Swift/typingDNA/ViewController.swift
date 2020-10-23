//
//  ViewController.swift
//  typingDNA
//
//  Created by Anmol Suri on 16/10/20.
//

import Cocoa
import WebKit

class ViewController: NSViewController, WKScriptMessageHandler {
    
    @IBOutlet weak var webV: WKWebView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
//        webV.configuration.userContentController.add(self, name: "jsHandler")
//        let bundleURL = Bundle.main.resourceURL!.absoluteURL
//        print(bundleURL)
//        let html = bundleURL.appendingPathComponent("index.html")
//        webV.loadFileURL(html, allowingReadAccessTo:bundleURL)
        
        let url = URL(string: "http://localhost:4200/")!
        webV.load(URLRequest(url: url))
        webV.allowsBackForwardNavigationGestures = true
        webV.configuration.userContentController.add(self, name: "jsHandler")
        webV.configuration.userContentController.add(self, name: "runCommand")
        
        let bundleURL = Bundle.main.resourceURL!.absoluteURL
        let pythonFile = bundleURL.appendingPathComponent("typingDna.py")
        let shellScript = bundleURL.appendingPathComponent("typingDna.sh")
        
        print(pythonFile)
        print(shellScript)
        
        do {
            
            let documentsPath = NSURL(fileURLWithPath: NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0])
            let logsPath = documentsPath.appendingPathComponent("typingDna")
            
            let pythonFileContent = try String(contentsOf: pythonFile)
            let pythonFileContentModified = pythonFileContent.replacingOccurrences(of: "basePath = ''", with: "basePath = '" + logsPath!.path + "'")
                
            writeDataToFile(str: pythonFileContentModified, fileName: "typingDna.py")
            
        } catch {
            print("Error: " + error.localizedDescription)
        }
        
    }
    
    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    @IBAction func showJSAlert(_ sender: Any) {
       let js = "hideText();"
       webV.evaluateJavaScript(js, completionHandler: nil)
    }
    
    func writeDataToFile(str: String, fileName: String)-> Bool{

        let documentsPath = NSURL(fileURLWithPath: NSSearchPathForDirectoriesInDomains(.documentDirectory, .userDomainMask, true)[0])
        let logsPath = documentsPath.appendingPathComponent("typingDna")
        print(logsPath!.path)
        do {
            try FileManager.default.createDirectory(atPath: logsPath!.path, withIntermediateDirectories: true, attributes: nil)
        } catch let error as NSError {
            NSLog("Unable to create directory \(error.debugDescription)")
        }

        let fileName = logsPath?.appendingPathComponent(fileName)

        do{
            try str.write(to: fileName!, atomically: false, encoding: String.Encoding.utf8)
            return true
        } catch let error as NSError {
            print("Ooops! Something went wrong: \(error)")
            return false
        }
    }
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        print(message)
       if message.name == "jsHandler" {
            
            do{
                print(message.body)
                let jsonData = try JSONSerialization.data(withJSONObject: message.body, options: JSONSerialization.WritingOptions.prettyPrinted);
                writeDataToFile(str: String(data: jsonData, encoding: String.Encoding.utf8)!, fileName: ".typingDna.txt");

            } catch {
                print(error.localizedDescription)
            }
       }
        if(message.name == "runCommand"){
            
            let pasteboard = NSPasteboard.general
            pasteboard.declareTypes([.string], owner: nil)
            let command = "typing-dna-auth " + String(describing: message.body)
            pasteboard.setString(command, forType: .string)
        }
    }
    
    static func newInsatnce() -> ViewController {
                
        let storyboard = NSStoryboard(name: NSStoryboard.Name("Main"), bundle: nil)
        let identifier = NSStoryboard.SceneIdentifier("ViewController")
                
        guard let viewcontroller = storyboard.instantiateController(withIdentifier: identifier) as? ViewController else {
            fatalError("Unable to instantiate ViewController in Main.storyboard")
        }
        
        return viewcontroller
    }
    
    func shell(command: String) -> Int32 {
        let task = Process()
        task.launchPath = "/usr/bin/osascript"
        task.arguments = ["-e", command]
        task.launch()
        task.waitUntilExit()
        return task.terminationStatus
    }
    
}
