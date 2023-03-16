import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import withModalProps from '../../../../helpers/higher-order-components/with-modal-props';
import Box from '../../../ui/box';
import {
  Text,
  Button,
  BUTTON_TYPES,
  ButtonIcon,
  ICON_NAMES,
} from '../../../component-library';
import {
  AlignItems,
  DISPLAY,
  FLEX_DIRECTION,
  JustifyContent,
  Size,
  TextVariant,
} from '../../../../helpers/constants/design-system';
import HoldToRevealButton from '../../hold-to-reveal-button';
import { useI18nContext } from '../../../../hooks/useI18nContext';
import ZENDESK_URLS from '../../../../helpers/constants/zendesk-url';
import { MetaMetricsContext } from '../../../../contexts/metametrics';
import {
  EVENT,
  EVENT_NAMES,
} from '../../../../../shared/constants/metametrics';

const HoldToRevealModal = ({ onLongPressed, willHide, hideModal }) => {
  const t = useI18nContext();
  const trackEvent = useContext(MetaMetricsContext);

  const unlock = () => {
    onLongPressed();
    if (willHide) {
      hideModal();
    }
  };

  const handleCancel = () => {
    hideModal();
  };

  return (
    <Box
      className="hold-to-reveal-modal"
      display={DISPLAY.FLEX}
      flexDirection={FLEX_DIRECTION.COLUMN}
      justifyContent={JustifyContent.flexStart}
      padding={6}
    >
      <Box
        display={DISPLAY.FLEX}
        flexDirection={FLEX_DIRECTION.ROW}
        alignItems={AlignItems.center}
        justifyContent={JustifyContent.spaceBetween}
        marginBottom={6}
      >
        <Text variant={TextVariant.headingSm}>{t('holdToRevealTitle')}</Text>
        <ButtonIcon
          className="hold-to-reveal-modal__close"
          iconName={ICON_NAMES.CLOSE}
          size={Size.SM}
          onClick={() => {
            trackEvent({
              category: EVENT.CATEGORIES.KEYS,
              event: EVENT_NAMES.SRP_HOLD_TO_REVEAL_CLOSE_CLICKED,
              properties: {
                key_type: EVENT.KEY_TYPES.SRP,
              },
            });
            handleCancel();
          }}
          ariaLabel={t('close')}
        />
      </Box>
      <Box
        display={DISPLAY.FLEX}
        flexDirection={FLEX_DIRECTION.COLUMN}
        gap={4}
        marginBottom={6}
      >
        <Text variant={TextVariant.bodyMd}>
          {t('holdToRevealContent1', [
            <Text
              key="hold-to-reveal-2"
              variant={TextVariant.bodyMdBold}
              as="span"
            >
              {t('holdToRevealContent2')}
            </Text>,
          ])}
        </Text>
        <Text variant={TextVariant.bodyMdBold}>
          {t('holdToRevealContent3', [
            <Text
              key="hold-to-reveal-4"
              variant={TextVariant.bodyMd}
              as="span"
              display={DISPLAY.INLINE}
            >
              {t('holdToRevealContent4')}
            </Text>,
            <Button
              key="hold-to-reveal-5"
              type={BUTTON_TYPES.LINK}
              size={Size.auto}
              href={ZENDESK_URLS.NON_CUSTODIAL_WALLET}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('holdToRevealContent5')}
            </Button>,
          ])}
        </Text>
      </Box>
      <HoldToRevealButton
        buttonText={t('holdToReveal')}
        onLongPressed={unlock}
        marginLeft="auto"
        marginRight="auto"
      />
    </Box>
  );
};

HoldToRevealModal.propTypes = {
  // The function to be executed after the hold to reveal long press has been completed
  onLongPressed: PropTypes.func.isRequired,
  hideModal: PropTypes.func,
  willHide: PropTypes.bool,
};

export default withModalProps(HoldToRevealModal);
