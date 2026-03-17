import {
  AddComponentCommand,
  ChangeFootprintCommand,
  ConnectPinsCommand,
  DisconnectPinsCommand,
  MoveComponentCommand,
  RemoveComponentCommand,
  RenameNetCommand,
  RotateComponentCommand,
  UpdateComponentCommand
} from '../commands/commands';
import { Command } from '../commands/types';
import { createComponent } from '../model/circuitModel';
import { AiEditOperation } from './types';

export const mapOperationsToCommands = (ops: AiEditOperation[]): Command[] =>
  ops.map((op) => {
    switch (op.op) {
      case 'add_component':
        return new AddComponentCommand(createComponent(op.type, op.id, op.reference, op.position.x, op.position.y));
      case 'remove_component':
        return new RemoveComponentCommand(op.componentId);
      case 'move_component':
        return new MoveComponentCommand(op.componentId, op.position);
      case 'rotate_component':
        return new RotateComponentCommand(op.componentId, op.orientation);
      case 'connect_pins':
        return new ConnectPinsCommand({ id: op.wireId, from: op.from, to: op.to, netId: op.netId });
      case 'disconnect_pins':
        return new DisconnectPinsCommand(op.wireId);
      case 'update_component':
        return new UpdateComponentCommand(op.componentId, op.patch);
      case 'rename_net':
        return new RenameNetCommand(op.netId, op.name);
      case 'change_footprint':
        return new ChangeFootprintCommand(op.componentId, op.footprint);
    }
  });

export const buildPreviewDiff = (ops: AiEditOperation[]): string[] => ops.map((op) => JSON.stringify(op));
