import React from 'react';

export function ReportModal() {
 

  return (
    <div
      className="modal fade popup"
      id="popup_report"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div className="modal-content">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="modal-body space-y-20 p-40">
            <h3>Report this item</h3>
            <div className="hr"></div>

            <iframe width="100%" style={{minHeight:600}} src={`https://docs.google.com/forms/d/e/1FAIpQLSfUVjj0d40vWPPN_2EtXHfv5HeEU9HNWf6Tv_9hAqBWbl8hnQ/viewform?usp=pp_url&entry.1077177103=${window.location.href}`}>

            </iframe>

            {/*
            <div className="form-group space-y-10">
              <span className="variationInput">reason:</span>
              <select
                className="form-select custom-select"
                aria-label="Default select example"
              >
                <option> Select a reason</option>
                <option>Purchase</option>
                <option>Support</option>
                <option>Technique</option>
                <option>Service Request</option>
              </select>
            </div>
            <div className="form-group space-y-10">
              <span className="variationInput">Additional comments:</span>
              <textarea
                name="..."
                cols="30"
                rows="10"
                placeholder="Explain why you are concerned about it."
              ></textarea>
            </div>
            <button className="btn btn-dark" onClick={handleSubmit}>
              Report
            </button>
            */}
          </div>
        </div>
      </div>
    </div>
  );
}
