// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-10-12
// @description  try to take over the world!
// @author       You
// @match        https://app.nuport.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nuport.io
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Function to remove country code from dialpad links

    // Function to remove country code from dialpad links and add click event for copying the number

    // Function to remove country code from dialpad links and add click event for copying the number
    function removeCountryCodeFromDialpad() {
        console.log('Removing country code and setting up click events for sw-phone links...');

        // Select only links with class "sw-phone" that contain the country code
        document.querySelectorAll('a.sw-phone[href^="dialpad://%2B88"]').forEach(link => {
            // Remove the country code
            link.href = link.href.replace("%2B88", "");

            // Add a click event to copy the number to the clipboard, while letting other events work
            link.addEventListener('click', function(event) {
                // Extract the phone number from the href
                const phoneNumber = link.href.replace('dialpad://', '');

                // Copy the phone number to the clipboard
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    console.log(`Copied to clipboard: ${phoneNumber}`);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });

                // Other event listeners or default behavior will continue
            });
        });
    }

    // Set up a MutationObserver to watch for changes to the DOM
    const observer = new MutationObserver(removeCountryCodeFromDialpad);

    // Start observing the document body for changes
    observer.observe(document.body, {
        childList: true,  // Watch for child node changes
        subtree: true     // Watch the entire subtree
    });

    // Run the function initially in case any links already exist
    removeCountryCodeFromDialpad();


})();