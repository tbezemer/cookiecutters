import click
import logging

logger = logging.getLogger(__name__)


@click.group()
@click.option("-v", "--verbose", is_flag=True)
def main(verbose):
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(level=level)


@main.command()
@click.argument("some_int_param", type=int, default=5)
def run(some_int_param):
    logger.info(f"Printing int '{some_int_param}'")
    print(some_int_param)
