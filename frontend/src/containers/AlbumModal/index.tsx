import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Icon, Modal } from 'semantic-ui-react';
import { RootState } from '../../typings/rootState';
import { createAlbum, updateAlbum } from '../AlbumsMenu/logic/actions';

interface Props {
	update?: WebApi.Entity.Album;
	children: JSX.Element;
}

const AlbumModal: React.FC<Props> = ({ update, children }) => {
	const dispatch = useDispatch();
	const { creatingAlbum, updatingAlbum } = useSelector((state: RootState) => state.albums);
	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [name, setNameText] = useState<string>(update ? update.name : '');
	const [loading, setLoading] = useState<boolean>(false);

	const setName = (value: string) => {
		if (value.length <= 30) {
			setNameText(value);
		}
	};

	const submit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!name) return;

		if (update) {
			dispatch(updateAlbum({ id: update.id, data: { name } }));
		} else {
			dispatch(createAlbum({ data: { id: 0, name, videos: [] } }));
		}

		setLoading(true);
	};

	const resetState = useCallback(() => {
		setName(update ? update.name : '');
		setLoading(false);
		setIsOpened(false);
	}, [update]);

	useEffect(() => {
		const modified = update ? !updatingAlbum : !creatingAlbum;

		if (modified && loading) {
			resetState();
		}
	}, [creatingAlbum, updatingAlbum, loading, resetState, update]);

	return (
		<Modal
			as="form"
			size="tiny"
			dimmer="blurring"
			trigger={children}
			openOnTriggerClick
			closeIcon
			closeOnEscape
			closeOnDimmerClick
			open={isOpened}
			onSubmit={submit}
			onOpen={() => setIsOpened(true)}
			onClose={() => setIsOpened(false)}
		>
			<Modal.Header>{update ? 'Update' : 'Create'} album</Modal.Header>
			<Modal.Content scrolling>
				<Form as="div" loading={loading}>
					<Form.Field>
						<label className="required">Name</label>
						<Form.Input
							fluid
							placeholder="Name your album"
							value={name}
							onChange={(event, data) => setName(data.value)}
						/>
					</Form.Field>
				</Form>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={resetState} disabled={loading}>
					Cancel
				</Button>
				<Button primary icon labelPosition="right" disabled={loading}>
					<Icon name="check" />
					Create
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default AlbumModal;
