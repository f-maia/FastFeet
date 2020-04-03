import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';

import api from '~/services/api';

import { Container, Title, Message, ButtonContainer } from './styles';

export default function alert(messages, route, reload) {
  return confirmAlert({
    title: messages.title,
    message: messages.info,
    buttons: [
      {
        label: 'Não',
        onClick: null,
      },
      {
        label: 'Sim',
        onClick: async () => {
          try {
            await api.delete(route);
            reload();

            toast.success(messages.success);
          } catch (err) {
            toast.error(messages.error);
          }
        },
      },
    ],
    customUI: function UI({ title, message, buttons, onClose }) {
      UI.propTypes = {
        title: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        buttons: PropTypes.arrayOf(PropTypes.object).isRequired,
        onClose: PropTypes.func.isRequired,
      };

      return (
        <Container className="custom-ui">
          <Title>{title}</Title>
          <Message>{message}</Message>
          <ButtonContainer>
            {buttons.map(({ label, onClick }) => (
              <button
                key={label}
                type="button"
                onClick={() => {
                  if (onClick) {
                    onClick();
                  }
                  onClose();
                }}
              >
                {label}
              </button>
            ))}
          </ButtonContainer>
        </Container>
      );
    },
  });
}
