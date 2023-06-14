import React from 'react';

// Link from react-router-dom
import { Link } from 'react-router-dom';

// styles
import "../../../styles/Dashboard/Host.css";

const Host = ({ updateTest }) => {
  return (
    <div className='host box'>
      {/* Head */}
      <div className="host__head">
        <h4 className='host__title'>Host a kapoot!</h4>
        <p className="host__description">More players - more fun! Invite 2 or more</p>
      </div>

      {/* Links */}
      <div className="host__links">
        {/* Play a game link */}
        <Link
          to='/play-a-game'
          className="host__link"
        >
          {/* icon */}
          <span className="link__icon">
            <svg viewBox="0 0 32 32" focusable="false" stroke="none" strokeWidth="0" aria-labelledby="label-0a963c76-6ff6-4bcb-8a1d-a1263071add5" aria-hidden="true" className="sc-jSUZER eTaWgc"><title id="label-0a963c76-6ff6-4bcb-8a1d-a1263071add5">Icon</title><path d="M26.817,15.425 C26.633,15.162 22.222,9 16,9 C9.778,9 5.367,15.162 5.183,15.425 C4.939,15.77 4.939,16.231 5.183,16.576 C5.367,16.838 9.778,23 16,23 C22.222,23 26.633,16.838 26.817,16.576 C27.061,16.23 27.061,15.77 26.817,15.425 Z M16,21 C11.834,21 8.451,17.425 7.269,15.999 C8.448,14.573 11.82,11 16,11 C20.166,11 23.549,14.576 24.731,16.001 C23.552,17.428 20.18,21 16,21 Z M16,12 C13.794,12 12,13.795 12,16 C12,18.206 13.794,20 16,20 C18.206,20 20,18.206 20,16 C20,13.795 18.206,12 16,12 Z M16,18 C14.897,18 14,17.103 14,16 C14,14.898 14.897,14 16,14 C17.103,14 18,14.898 18,16 C18,17.103 17.103,18 16,18 Z" style={{fill: "rgb(255, 255, 255)"}}></path></svg>
          </span>

          {/* Text */}
          Play a game

          {/* Arrow */}
          <div className="link__arrow-wrap">
            <div className="link__arrow"></div>
          </div>
        </Link>

        {/* Create a Kapoot link */}
        <Link
          to="/create-kapoot"
          className='host__link'
          onClick={updateTest}
        >
          {/* icon */}
          <span className="link__icon">
            <svg viewBox="0 0 32 32" focusable="false" stroke="none" strokeWidth="0" aria-labelledby="label-4db78915-78a8-40b3-9373-038573a3e9ca" aria-hidden="true" className="sc-jSUZER eTaWgc"><title id="label-4db78915-78a8-40b3-9373-038573a3e9ca">Icon</title><path d="M23.4091683,8.594 C24.1731683,9.359 24.1731683,10.693 23.4091683,11.458 L22.6901683,12.178 L19.8241683,9.313 L20.5451683,8.594 C21.3101683,7.83 22.6441683,7.829 23.4091683,8.594 L23.4091683,8.594 Z M8.37616832,23.626 L8.97116832,21.252 L10.7501683,23.033 L8.37616832,23.626 Z M18.4111683,10.728 L21.2741683,13.591 L12.7061683,22.159 L9.84316832,19.296 L18.4111683,10.728 Z M24.8211683,7.179 C24.0611683,6.418 23.0501683,6 21.9741683,6 C20.9001683,6 19.8881683,6.418 19.1281683,7.179 L7.71916832,18.587 C7.71916832,18.587 7.71816832,18.59 7.71716832,18.591 C7.63616832,18.673 7.49716832,18.889 7.45616832,19.052 L6.03016832,24.757 C5.94416832,25.097 6.04516832,25.458 6.29316832,25.706 L6.29416832,25.707 L6.29616832,25.708 C6.54416832,25.956 6.90416832,26.057 7.24516832,25.972 L12.9491683,24.545 C13.1121683,24.504 13.3291683,24.365 13.4101683,24.284 C13.4111683,24.283 13.4141683,24.282 13.4141683,24.282 L24.8231683,12.873 C25.5831683,12.113 26.0021683,11.102 26.0011683,10.027 C26.0011683,8.951 25.5831683,7.941 24.8231683,7.18 L24.8211683,7.179 Z" style={{fill: "rgb(255, 255, 255)"}}></path></svg>
          </span>

          {/* Text */}
          Create a Kapoot

          {/* Arrow */}
          <div className="link__arrow-wrap">
            <div className="link__arrow"></div>
          </div>
        </Link>

        {/* Host kapoot link */}
        <Link
          to="/host-kapoot"
          className='host__link'
        >
          {/* icon */}
          <span className="link__icon">
            <svg viewBox="0 0 32 32" focusable="false" stroke="none" strokeWidth="0" aria-labelledby="label-9320555d-bd43-4627-b8bf-96db6de99763" aria-hidden="true" className="sc-jSUZER eTaWgc"><title id="label-9320555d-bd43-4627-b8bf-96db6de99763">Icon</title><path d="M11,10.482 L20.015,15.741 L11,21 L11,10.482 Z M9,7 L9,24.482 L23.985,15.741 L9,7 Z" style={{fill: "rgb(255, 255, 255)"}}></path></svg>
          </span>

          {/* Text */}
          Host a Kapoot

          {/* Arrow */}
          <div className="link__arrow-wrap">
            <div className="link__arrow"></div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Host;
