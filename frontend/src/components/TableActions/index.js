import React, { useState, useCallback, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';

import {
  MdMoreHoriz,
  MdVisibility,
  MdEdit,
  MdDeleteForever,
} from 'react-icons/md';

import history from '~/services/history';

import alert from './alert';

import { Container, Badge, ActionList, ActionContainer } from './styles';

export default function TableActions({
  view = null,
  edit = null,
  remove = null,
  width = 150,
}) {
  const actionsContainerRef = createRef();
  const [visible, setVisible] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const iconSize = 22;

  const memoizedToggle = useCallback(
    (e) => {
      function checkOutsideToggleVisible() {
        if (actionsContainerRef.current) {
          if (actionsContainerRef.current.contains(e.target)) return;

          setVisible(false);
        }
      }

      checkOutsideToggleVisible();
    },
    [actionsContainerRef]
  );

  useEffect(() => {
    document.addEventListener('mousedown', memoizedToggle, false);
  }, [memoizedToggle]);

  useEffect(
    () => () => {
      document.removeEventListener('mousedown', memoizedToggle, false);
    },
    [memoizedToggle]
  );

  function calculateLeftAndTop() {
    const left = iconSize / 2 - width / 2;
    const top = 1.5 * iconSize;

    const arrowTop = Math.ceil(-iconSize / 4);
    const arrowLeft = width / 2 - Math.ceil(iconSize / 4);

    return { width, left, top, arrowTop, arrowLeft };
  }

  function handleToggleVisible() {
    setVisible(!visible);
  }

  function handleDelete() {
    const { message, route, reload } = remove;

    alert(message, route, reload);
  }

  function renderView() {
    const { modal: Modal, props } = view;

    return (
      <ActionContainer>
        <button type="button" onClick={() => setViewModal(true)}>
          <MdVisibility color="#8E5BE8" size={16} />
          <span>Visualizar</span>
        </button>
        <Modal
          data={props}
          show={viewModal}
          closeModal={() => setViewModal(false)}
        />
      </ActionContainer>
    );
  }

  function renderEdit() {
    return (
      <ActionContainer>
        <button
          type="button"
          onClick={() => history.push(edit.route, edit.state)}
        >
          <MdEdit color="#4D85EE" size={16} />
          <span>Editar</span>
        </button>
      </ActionContainer>
    );
  }

  function renderRemove() {
    return (
      <ActionContainer>
        <button type="button" onClick={handleDelete}>
          <MdDeleteForever color="#DE3B3B" size={16} />
          <span>{remove.text || 'Excluir'}</span>
        </button>
      </ActionContainer>
    );
  }

  return (
    <Container ref={actionsContainerRef}>
      <Badge onClick={handleToggleVisible}>
        <MdMoreHoriz color="#C6C6C6" size={iconSize} />
      </Badge>

      <ActionList visible={visible} {...calculateLeftAndTop()}>
        {!!view && renderView()}
        {!!edit && renderEdit()}
        {!!remove && renderRemove()}
      </ActionList>
    </Container>
  );
}

TableActions.defaultProps = {
  view: null,
  edit: null,
  remove: null,
  width: 150,
};

TableActions.propTypes = {
  view: PropTypes.shape({
    modal: PropTypes.func,
    props: PropTypes.object,
  }),
  edit: PropTypes.shape({
    route: PropTypes.string,
    state: PropTypes.object,
  }),
  remove: PropTypes.shape({
    text: PropTypes.string,
    route: PropTypes.string,
    message: PropTypes.shape({
      title: PropTypes.string.isRequired,
      info: PropTypes.string.isRequired,
      success: PropTypes.string.isRequired,
      error: PropTypes.string.isRequired,
    }),
    reload: PropTypes.func,
  }),
  width: PropTypes.number,
};
