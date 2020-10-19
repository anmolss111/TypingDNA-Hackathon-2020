//
//  AppDelegate.swift
//  typingDNA
//
//  Created by Anmol Suri on 16/10/20.
//

import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {

    let statusItem = NSStatusBar.system.statusItem(withLength:NSStatusItem.squareLength)
    
    let popover = NSPopover()
    
    func applicationDidFinishLaunching(_ aNotification: Notification) {
        // Insert code here to initialize your application
        
        if let button = self.statusItem.button {
            button.image = NSImage(named: NSImage.Name("ExampleMenuBarIcon"))
            button.action = #selector(AppDelegate.togglePopover(_:))
        }
        
        self.popover.contentViewController = ViewController.newInsatnce()
        self.popover.animates = false
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
    }
    
    @objc func togglePopover(_ sender: NSStatusItem) {
        
        print("hello")
        
        if self.popover.isShown {
            closePopover(sender: sender)
        }
        else {
            showPopover(sender: sender)
        }
    }
    
    func showPopover(sender: Any?) {
        
        print("")
        
        if let button = self.statusItem.button {
            self.popover.show(relativeTo: button.bounds, of: button, preferredEdge: NSRectEdge.minY)
        }
    }

    func closePopover(sender: Any?)  {
        self.popover.performClose(sender)
    }

}

