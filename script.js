// ===========================
// Matcha Cafe Finder - Filter Functionality
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter dropdowns
    const locationFilter = document.getElementById('location-filter');
    const vibeFilter = document.getElementById('vibe-filter');
    const priceFilter = document.getElementById('price-filter');

    // Get all cafe cards
    const cafeCards = document.querySelectorAll('.cafe-card');

    // Get the screen reader announcement div
    const resultsAnnouncement = document.getElementById('filter-results');

    // Add event listeners to all dropdowns
    locationFilter.addEventListener('change', filterCafes);
    vibeFilter.addEventListener('change', filterCafes);
    priceFilter.addEventListener('change', filterCafes);

    // Main filter function
function filterCafes() {
    // Get current filter values
    const selectedLocation = locationFilter.value;
    const selectedVibe = vibeFilter.value;
    const selectedPrice = priceFilter.value;
    
    let visibleCount = 0;
    
    // Loop through each cafe card
    cafeCards.forEach(card => {
        const cardLocationsString = card.getAttribute('data-location');
        const cardVibesString = card.getAttribute('data-vibe');
        const cardPrice = card.getAttribute('data-price');
        
        // Split locations and vibes into arrays (handles both single and multiple)
        const cardLocations = cardLocationsString ? cardLocationsString.trim().split(/\s+/) : [];
        const cardVibes = cardVibesString ? cardVibesString.trim().split(/\s+/) : [];
        
        // Check if card matches all active filters
        const locationMatch = selectedLocation === 'all' || cardLocations.includes(selectedLocation);
        const vibeMatch = selectedVibe === 'all' || cardVibes.includes(selectedVibe);
        const priceMatch = selectedPrice === 'all' || cardPrice === selectedPrice;
        
        // Show card if it matches all filters, hide if not
        if (locationMatch && vibeMatch && priceMatch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });
    
    // Update screen reader announcement
    announceResults(visibleCount);
}

    // Announce filter results to screen readers
    function announceResults(count) {
        if (count === 0) {
            resultsAnnouncement.textContent = 'No cafes match your filters. Try adjusting your selections.';
        } else if (count === 1) {
            resultsAnnouncement.textContent = '1 cafe found.';
        } else {
            resultsAnnouncement.textContent = count + ' cafes found.';
        }
    }

});
