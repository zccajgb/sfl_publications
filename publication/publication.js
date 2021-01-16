function setParams(data) {

    var authors = data.Authors.join(', ');
    // var authors="str";
    $("#Authors").text(authors);
    $("#Title").text(data.Title);
    document.Title = data.Title;
    $("#Year").text(data.Year);
    $("#Date").text(data.Date);
    $("#ReportType").text(data.ReportType);
    $("#ExecSummary").text(data.ExecSummary);

    $("#RT1").text(data.ReportType + "s");
    $("#RT1").attr("href", "http://www.publications.scientistsforlabour.org.uk/#" + data.ReportType + "s");
    $("#RT2").text(data.ReportType);

    var body = '';
    data.Body.forEach(el => {
        body += '<div class="underline-header"><h2>' + el.Heading +'</h2></div>';
        if (el.Subheadings) {
            el.Sub.forEach(e => {
                body += "<h4>" + e.Heading + "</h4><p>" + e.Body + "</p>";
            });
        }
        else {
            body += "<p>" + el.Body + "</p>";
        }
    });

    $("#Body").append(body);

    var related ='';
    data.Related.forEach(el => {
        related += "<div class='mt-4'>"
        related += "<h6> " + el.Type + " | " + el.Date + "</h6>";
        related += "<h5><a href='" + el.Link + "'>" + el.Title + "</a></h5>";
        related += "<h6>" + el.Authors.join(", ") +"</h6>";
        related += "</div>";
    });
    $("#Related").append(related);
    
    var cite = "<small>" + authors + "(" + data.Year + "). " + data.Title + ". <i>SFL</i>." + "</small>";
    $("#Cite").append(cite);

    var twtText = data.TwitterText + ' ' + data.DoiUrl;
    var twt = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(twtText);
    $("#TwitterShare").attr("href", twt)
}

function cite() {
    $('#Cite').toggle();
}

