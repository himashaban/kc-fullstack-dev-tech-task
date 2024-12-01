<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');
// Set the Content-Type to JSON
header('Content-Type: application/json');

// Get the file path to categories.json
$categoriesFile = __DIR__ . '/../data/categories.json';

// Check if the file exists and is readable
if (file_exists($categoriesFile) && is_readable($categoriesFile)) {
    // Read the contents of the file
    $categoriesData = file_get_contents($categoriesFile);
    
    // Return the categories as JSON
    echo $categoriesData;
} else {
    // Return error if file is not found
    http_response_code(404);
    echo json_encode(['error' => 'Categories data not found']);
}
?>
