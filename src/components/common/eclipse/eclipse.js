import React, { Component } from 'react';
import './eclipse.css';

class EclipseWidgetContainer extends Component {
    render() {
        return (
            <div className="eclipse">
                <div class="loader"></div>
            </div>

        );
    }
}
const EclipseWidget = (EclipseWidgetContainer);
export default EclipseWidget;