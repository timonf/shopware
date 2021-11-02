const { Application } = Shopware;
const { capitalizeString } = Shopware.Utils.string;

Application.addServiceProvider('flowBuilderService', () => {
    return flowBuilderService();
});

export default function flowBuilderService() {
    const $icon = {
        addTag: 'default-action-tags',
        removeTag: 'default-action-tags',
        mailSend: 'default-communication-envelope',
        setOrderState: 'default-shopping-plastic-bag',
        generateDocument: 'default-documentation-file',
        changeCustomerGroup: 'default-avatar-multiple',
        changeCustomerStatus: 'default-avatar-single',
        stopFlow: 'default-basic-x-circle',
        setCustomField: 'default-documentation-paper-pencil-signed',
    };

    const $labelSnippet = {
        addTag: 'sw-flow.actions.addTag',
        removeTag: 'sw-flow.actions.removeTag',
        mailSend: 'sw-flow.actions.mailSend',
        setOrderState: 'sw-flow.actions.setOrderState',
        generateDocument: 'sw-flow.actions.generateDocument',
        changeCustomerGroup: 'sw-flow.actions.changeCustomerGroup',
        changeCustomerStatus: 'sw-flow.actions.changeCustomerStatus',
        stopFlow: 'sw-flow.actions.stopFlow',
        setCustomField: 'sw-flow.actions.changeCustomFieldContent',
    };

    return {
        getActionTitle,
        getActionModalName,
    };

    function getActionTitle(actionName) {
        if (!actionName) {
            return null;
        }

        if (actionName.includes('tag')) {
            if (actionName.includes('add')) {
                return {
                    value: actionName,
                    icon: $icon.addTag,
                    label: $labelSnippet.addTag,
                };
            }

            if (actionName.includes('remove')) {
                return {
                    value: actionName,
                    icon: $icon.removeTag,
                    label: $labelSnippet.removeTag,
                };
            }
        }

        if (Shopware.Feature.isActive('FEATURE_NEXT_17973')) {
            if (actionName.includes('custom') && actionName.includes('field')) {
                return {
                    value: actionName,
                    icon: $icon.setCustomField,
                    label: $labelSnippet.setCustomField,
                };
            }
        }

        let keyName = '';
        actionName.split('.').forEach((key, index) => {
            if (!index) {
                return;
            }

            if (index === 1) {
                keyName = key;
                return;
            }

            keyName += capitalizeString(key);
        });

        return {
            value: actionName,
            icon: $icon[keyName],
            label: $labelSnippet[keyName],
        };
    }

    function getActionModalName(actionName) {
        if (!actionName) {
            return '';
        }

        if (actionName.includes('tag') &&
           (actionName.includes('add') || actionName.includes('remove'))) {
            return 'sw-flow-tag-modal';
        }

        if (Shopware.Feature.isActive('FEATURE_NEXT_17973')) {
            if (actionName.includes('custom') && actionName.includes('field')) {
                return 'sw-flow-set-entity-custom-field-modal';
            }
        }

        return `${actionName.replace(/\./g, '-').replace('action', 'sw-flow')}-modal`;
    }
}
