import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { Field } from '@aragon/ui'
import { SaveButton, LargeTextInput } from './large-inputs'

@inject("mainStore")
@observer
export class EditGroupCreate extends Component {
  state = { groupName: '' }

  get mainStore() { return this.props.mainStore }

  render() {
    return (
      <Main>
        <form onSubmit={event => event.preventDefault()}>
          <Field label="Group name:">
            <LargeTextInput value={this.state.groupName} onChange={e => this.setState({ groupName: e.target.value })} required />
          </Field>
          <Actions>
            <SaveButton mode="strong" onClick={() => this.mainStore.createGroup(this.state.groupName)} type="submit">Create</SaveButton>
          </Actions>
        </form>
      </Main>
    )
  }
}

const Main = styled.div`  
`
const Actions = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`