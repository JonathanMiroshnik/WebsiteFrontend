function addHTMLContent(form) {
    // Capture the current HTML content of the page
    const htmlContent = document.documentElement.outerHTML;
    
    // Set the hidden input value
    const htmlInput = document.getElementById('htmlContent');
    if (htmlInput) {
        htmlInput.value = htmlContent;
    }
    
    return true; // Allow form submission to continue
}

function resetStyles() {
    // Remove the AI-generated styles
    const aiStyles = document.getElementById('ai-generated-styles');
    if (aiStyles) {
        aiStyles.remove();
    }
    
    // Re-enable all existing stylesheets
    const existingStylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    existingStylesheets.forEach(link => {
        link.disabled = false;
    });
    
    // Clear the generated content display
    const generatedContent = document.getElementById('generated-css-content');
    if (generatedContent) {
        generatedContent.innerHTML = '';
    }
}