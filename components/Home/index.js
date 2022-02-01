import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { usePrevious } from 'ahooks';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';
import EditCompPropsForm from '../EditCompPropsForm';
import { isEqual } from 'lodash/lang';

const importView = (comp) => dynamic(() => import(`../${comp?.name}`));

export default function Home({ comps }) {
  const [currentComps, setCurrentComps] = useState(comps);
  const [views, setViews] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [propsToEdit, setPropsToEdit] = useState(null);
  const previousComps = usePrevious(currentComps);

  useEffect(() => {
    return () => {
      setPropsToEdit(null);
      setShowEditForm(false);
      setViews([]);
    };
  }, []);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result, views) => {
    if (!result.destination) {
      return;
    }

    const destinationItems = reorder(
      views,
      result.source.index,
      result.destination.index,
    );

    setViews(destinationItems);
  };

  useEffect(() => {
    if (!isEqual(previousComps, currentComps)) {
      async function loadViews() {
        const componentPromises = currentComps.map(async (comp, index) => {
          const View = await importView(comp);
          return {
            id: `${index}`,
            comp: <View key={nanoid()} {...comp.props} />,
            props: comp.props,
            name: comp.name,
          };
        });
        Promise.all(componentPromises).then(setViews);
      }
      void loadViews();
    }
  }, [currentComps, previousComps]);

  const showEditCompProps = (compProps, compName) => {
    setPropsToEdit({ ...compProps, name: compName });
    setShowEditForm(true);
  };

  const changeCompProps = (compProps, changeValue, compsList) => {
    const result = Array.from(compsList);
    const { name } = compProps;
    const index = result.findIndex((item) => item.name === name);
    if (index !== undefined) {
      result[index].props = { ...result[index].props, title: changeValue };
      const temp = [...result];
      setCurrentComps(temp);
    }
  };

  return (
    <>
      {showEditForm && (
        <EditCompPropsForm
          {...propsToEdit}
          close={() => setShowEditForm(false)}
          onSubmit={(value) => changeCompProps(propsToEdit, value, views)}
        />
      )}
      {!showEditForm && (
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result, views);
          }}
        >
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {views.map((item, index) => (
                  <Draggable
                    key={`${index}`}
                    draggableId={`${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        style={{ padding: '16px' }}
                        ref={provided.innerRef}
                        onClick={() => showEditCompProps(item.props, item.name)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.comp}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}
