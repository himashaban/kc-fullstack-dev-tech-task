<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

header('Content-Type: application/json');

// File paths to courses and categories JSON files
$coursesFile = __DIR__ . '/../data/course_list.json';
$categoriesFile = __DIR__ . '/../data/categories.json';

// Fetch categories and courses data
$categoriesData = json_decode(file_get_contents($categoriesFile), true);
$coursesData = json_decode(file_get_contents($coursesFile), true);

// Check if category_id is passed as a query parameter
if (isset($_GET['category_id'])) {
    $categoryId = $_GET['category_id'];
    
    // Filter courses based on the passed category_id
    $filteredCourses = array_filter($coursesData, function($course) use ($categoryId) {
        return $course['category_id'] === $categoryId; // Matching category_id
    });
    
    // Return filtered courses as JSON
    echo json_encode(array_values($filteredCourses)); 
} else {
    // Return all courses if no category_id filter is applied
    echo json_encode($coursesData);
}
?>
