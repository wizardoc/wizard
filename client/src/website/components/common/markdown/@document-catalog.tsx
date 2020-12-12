import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';

import {CatalogProps} from 'website/ui';

export interface DocumentCatalogProps extends CatalogProps {}

const Wrapper = styled.div`
  width: 300px;
`;

export class DocumentCatalog extends Component<DocumentCatalogProps> {
  render(): ReactNode {
    return <Wrapper>{/* <Catalog {...this.props}></Catalog> */}</Wrapper>;
  }
}
