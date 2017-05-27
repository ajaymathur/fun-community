import React from 'react';

import { View, ActivityIndicator } from 'react-native';

class Loader extends React.Component {
  constructor(props) {
    super( props );
  }

  render() {
    return (
      <View>
        {this.props.showLoader ?
          <ActivityIndicator
            animating={true}
            style={{height: 80}}
            size="large"
            color="#004aff"
          />
          : null
        }
      </View>

    )
  }
}

Loader.propTypes = {
  showLoader: React.PropTypes.bool.isRequired,
};

export default Loader;
