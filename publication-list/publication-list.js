function initialise(data) {
    var dropdown = ["All"];
    reportTypes = [...new Set(data.map(x => x.ReportType))].sort();
    dropdown = dropdown.concat(reportTypes);
    $('#SelectTarget').empty();
    $('#SelectTarget').append(dropdown.map(x => "<option>" + x + "</option>"));

    var hash = window.location.hash;
    if (hash) {
        var query = hash.slice(1, -1);
        selectChange(data, query)
        var val = query.charAt(0).toUpperCase() + query.slice(1);
        $('#SelectTarget').val(val);
        $('#SelectTarget').change();
    }
    else {
        setParams(data);
    }

}

function setParams(data) {
    pubList ='';
    pubList += "<div class='list-group'>";
    data = data.sort(d => Date.parse(d.Date)).reverse();
    data.forEach(el => {
        pubList += "<a href='" + el.DoiUrl + "' class='list-group-item list-group-item-action flex-column align-items-start'>";
        pubList += '<div class="d-flex w-100 justify-content-between">';
        pubList += "<h6> " + el.ReportType;
        if (el.Date) { 
            pubList += " | " + el.Date;
        }
        pubList += "</h6>";
        pubList += "<small> SFL (" + el.Year + ")</small>";
        pubList += "</div>"
        pubList += "<h5>" + el.Title + "</h5>";
        pubList += "<h6>" + el.Authors.join(", ") +"</h6>";
        // pubList += "</div>";
        pubList += "</a>";
    });
    pubList += "</div>";
    $('#PubList').empty();
    $("#PubList").append(pubList);
}

function search(data, query) {
    if (!query) return data;
    var filtered = data.filter(x => searchInDatum(x, query));
    setParams(filtered);
}

function searchInDatum(datum, query) {
    query = query.toLowerCase();
    var authMatch = datum.Authors.some(a => a.toLowerCase().includes(query));
    var titleMatch = datum.Title.toLowerCase().includes(query);
    return authMatch || titleMatch;
}

function selectChange(data, selected) {
    var filtered = data.filter(x => x.ReportType.toLowerCase() === selected.toLowerCase());
    if (filtered.length === 0) filtered = data;
    setParams(filtered);
}