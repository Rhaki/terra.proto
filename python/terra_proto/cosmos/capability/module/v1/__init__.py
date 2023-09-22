# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: cosmos/capability/module/v1/module.proto
# plugin: python-betterproto
# This file has been @generated

from dataclasses import dataclass

import betterproto


@dataclass(eq=False, repr=False)
class Module(betterproto.Message):
    """Module is the config object of the capability module."""

    seal_keeper: bool = betterproto.bool_field(1)
    """
    seal_keeper defines if keeper.Seal() will run on BeginBlock() to prevent
    further modules from creating a scoped keeper. For more details check
    x/capability/keeper.go.
    """
