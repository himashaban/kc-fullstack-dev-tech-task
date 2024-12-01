document.addEventListener("DOMContentLoaded", async function () {
  const categoryList = document.getElementById("categoryList");
  const coursesField = document.getElementById("coursesField");

  // Fetch and display categories as a clickable menu
  async function fetchCategories() {
    const response = await fetch("http://localhost:8000/api/categories.php");
    const categories = await response.json();

    for (const category of categories) {
      const categoryItem = document.createElement("div");
      categoryItem.classList.add("category-item");
      categoryItem.dataset.categoryId = category.id;

      // Fetch course count for the category
      const courseResponse = await fetch(
        `http://localhost:8000/api/course_list.php?category_id=${category.id}`
      );
      const courses = await courseResponse.json();
      const courseCount = courses.length; // Get the count of courses

      // Set category text with count
      categoryItem.textContent = `${category.name} (${courseCount})`;

      // Add click event listener
      categoryItem.addEventListener("click", function () {
        const categoryId = categoryItem.dataset.categoryId;
        const categoryName = categoryItem.textContent.split(" (")[0]; // Extract category name
        fetchCourses(categoryId, categoryName); // Fetch courses based on category
      });

      categoryList.appendChild(categoryItem);
    }
  }

  // Fetch and display courses
  async function fetchCourses(categoryId = null, categoryName = "") {
    let url = "http://localhost:8000/api/course_list.php";
    if (categoryId) {
      url += `?category_id=${categoryId}`;
    }

    const response = await fetch(url);
    const courses = await response.json();

    coursesField.innerHTML = ""; // Clear existing courses

    courses.forEach((course) => {
      const courseItem = document.createElement("div");
      courseItem.classList.add("course-item");

      const courseName = document.createElement("h3");
      courseName.textContent = course.title;

      const courseImg = document.createElement("img");
      courseImg.src = course.image_preview;
      courseImg.alt = course.title;

      const courseDescription = document.createElement("p");
      courseDescription.textContent = course.description.slice(0, 120);

      // Create a span for the category name
      const categorySpan = document.createElement("span");
      categorySpan.textContent = categoryName;
      categorySpan.classList.add("category-name");

      // Append elements to courseItem
      courseItem.appendChild(courseImg);
      courseItem.appendChild(courseName);
      courseItem.appendChild(courseDescription);
      courseItem.appendChild(categorySpan); // Add category span to course item

      coursesField.appendChild(courseItem);
    });
  }

  // Initial load
  await fetchCategories(); // Load categories
  await fetchCourses(); // Load all courses initially
});
